import { Node } from './Node';
// import { add, subtract, multiply, divide } from 'mathjs'


// Number Node
export class NumberNode extends Node {
  value: number;

  constructor(id: string, value: number = 0) {
    super(id);
    this.typeName = 'math.number';
    this.value = value;
    this.outputPoint = {x: 80, y: 15};
  }

  public setValue(value: number) {
    this.value = value;
  }

  public getOutput() {
    return this.value;
  }
}


// Compute Node
export class ComputeNode extends Node {

  type: string;

  constructor(id: string) {
    super(id);
    this.typeName = 'math.compute';
    this.type = 'Add';
    this.outputPoint = {x: 90, y: 25};
    this.inputs = {
      'A': {
        key: 'A',
        isSingle: true,
        node: [],
        offset: {x: 10, y: 15},
      },
      'B': {
        key: 'B',
        isSingle: true,
        node: [],
        offset: {x: 10, y: 35},
      },
    }
  }

  public setType(type: string) :void {
    this.type = type;
  }

  public getOutput() :any {
    if (this.inputs['A'].node.length > 0 && this.inputs['B'].node.length > 0) {
      const a = this.inputs['A'].node[0].getOutput();
      const b = this.inputs['B'].node[0].getOutput();

      if (this.type === "Add") return parseFloat((a + b).toFixed(10));
      else if (this.type === "Subtract") return parseFloat((a - b).toFixed(10));
      else if (this.type === "Multiply") return parseFloat((a * b).toFixed(10));
      else if (this.type === "Divide") return parseFloat((a / b).toFixed(10));
      else return 0;
    } else {
      return 0;
    }
  }
}


// Sum Node
export class SumNode extends Node {

  constructor(id: string) {
    super(id);
    this.typeName = 'Sum';

    this.inputs = {
      'default': {
        key: 'default',
        isSingle: false,
        node: [],
        offset: {x: 0, y: 10},
      },
    }
  }

  public getOutput() :any {
    let sum: number = 0;
    this.inputs['default'].node.forEach((node: Node) => {
        sum += node.getOutput();
    })
    return sum;
  }
}
