import express from "express";

export interface configureRoutes {
  app: express.Application;
  name: string;
  getName(): string;
}

export interface CRUD {
  list: (limit: number, page: number) => Array<any>;
  readById: (id: string) => any;
  create: (resource: any) => any;
  updateById: (resource: any) => string;
  patchById: (resource: any) => string;
  deleteById: (id: string) => string;
}
