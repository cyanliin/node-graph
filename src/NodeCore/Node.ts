import type { Vector2 } from "./Utility";

export interface NodeInputInfo {
  key: string;
  node: Node[];
  isSingle: boolean;
  offset: Vector2;
}

export interface NodeInputs {
  [key: string]: NodeInputInfo
}

export interface NodeConnection {
  from: Node,
  to: Node,
  key: string,
} 

export class Node {
  id: string;
  typeName: string;
  title: string;
  inputs: NodeInputs;
  position: Vector2;
  outputPoint: Vector2;
  width: number;

  constructor(id: string) {
    this.id = id;
    this.typeName = "Node";
    this.title = "Untitled";
    this.inputs = {};
    this.position = {x: 0, y: 0};
    this.outputPoint = {x: 108, y: 32};
    this.width = 100;
  }

  public getType(): string {
    return this.typeName;
  }

  public setPosition(position: Vector2): void {
    this.position = position;
  }

  public addInput(inputNode: Node, key: string = 'default') {
    if (!this.inputs.hasOwnProperty(key)) {
      console.error(`Cannot found key "${key}" in Node: ${this.typeName}`);
    }

    const input = this.inputs[key];
    if (input.isSingle) {
      this.inputs[key].node[0] = inputNode;
    } else {
      this.inputs[key].node.push(inputNode);
    }
  }

  public getOutput(): any {
    return null;
  }
}


