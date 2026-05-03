/// <reference types="vite/client" />

/** Vite inlines the worker module into the parent bundle (single-file HACS). */
declare module '*?worker&inline' {
  const WorkerFactory: new () => Worker;
  export default WorkerFactory;
}
