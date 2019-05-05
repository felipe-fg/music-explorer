# Music Explorer

See your favorite artists and discover new ones in between.

This experience uses Spotify to show your favorite artists and find similar artists that you may also enjoy.

## How It Works

This project depends on the official [Spotify Web API](https://developer.spotify.com/documentation/web-api/) to read information about you and other artists.

Once connected to your account, it will read your favorite artists (based on top artists API).

Next, it will get similar artists for each top artist (based on related artists API).

At the end, a network (graph theory) is built where each node is an artist (top or new) and the edges are connections of similarity.

## License

Although the code is MIT, don't forget to read the [Spotify Developer Terms of Service](https://developer.spotify.com/terms/) since this project requires a Spotify Web API integration.

## How To Run Locally

Create a new application to get a `client_id`. [Click here](https://developer.spotify.com/documentation/web-api/) for more info.

Since the project is 100% client side, it uses the Implict Grant Flow for authorization. You need to allow a redirect URL that will authorize the user. [Click here](https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow) for more info.

Update the `.env` file with your `client_id` and redirect URL. You can also change settings and increase (or decrease) the number of top / similar artists used (be careful with the number of requests).

This is based on Create React App, so you can run using `yarn start`.
