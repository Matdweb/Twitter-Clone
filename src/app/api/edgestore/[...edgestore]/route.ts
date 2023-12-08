import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";

const es = initEdgeStore.create();

const edgeStoreRounter = es.router({
    publicImages: es.imageBucket(),
});

const handler = createEdgeStoreNextHandler({
    router: edgeStoreRounter,
});

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRounter;