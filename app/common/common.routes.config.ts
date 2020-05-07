import express from "express";

export class CommonRoutesConfig {
  public app: express.Application;
  public name: string;

  constructor(app: express.Application, name: string) {
    this.app = app;
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }
}
