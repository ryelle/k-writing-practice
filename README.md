# Korean Writing Practice

This is a fairly simple app using Next.js and the [AI SDK](https://ai-sdk.dev/). There are a list of writing prompts (in `src/app/prompts.json`). For each prompt, you can generate some vocabulary to use, and then submit a sentence for review. Once submitted, you can keep chatting with the AI tutor to revise the sentence or clarify points.

## Try it out!

You'll need an [Upstage API](https://www.upstage.ai/) key. Once you have it, create a file `.env.local` and add the key like this:

```
UPSTAGEAI_API_KEY=yourkeyhere
```

Now you can install the dependencies and start the app.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
