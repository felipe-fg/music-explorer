export abstract class ImageChecker {
    /**
     * Checks if an image is a valid one.
     *
     * @static
     * @param {(string | undefined)} url Image URL.
     * @returns {Promise<boolean>} True if valid.
     * @memberof ImageChecker
     */
    public static async checkImage(url: string | undefined): Promise<boolean> {
        if (url == null) {
            return Promise.resolve(false);
        }

        return await new Promise((resolve) => {
            const image = new Image();

            // Flag as invalid
            image.onerror = () => {
                resolve(false);
            };

            // Exec a double check
            image.onload = () => {
                const valid = image.width > 0 && image.height > 0;

                resolve(valid);
            };

            image.src = url;
        });
    }
}
