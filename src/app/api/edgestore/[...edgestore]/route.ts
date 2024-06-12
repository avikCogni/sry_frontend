import { initEdgeStore } from "@edgestore/server";
//API Handler
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
    publicFiles: es.fileBucket(),
});

const handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
});

//EXport handler for Get and post requests
export { handler as GET, handler as POST };

//Export router type
export type EdgeStoreRouter = typeof edgeStoreRouter;