export interface ISubTodo {
  title: string;
  done: boolean;
}

export interface ITodoType {
  type: string;
  id: string;
  attributes: {
    title: string;
  };
}

export interface ITodo {
  title: string;
  uniqueTitle: string;
  author: string;
  description: string;
  color: string;
  type: ITodoType;
  subTodos: ISubTodo[];
  done: boolean;
}
