export class SelectItemModel {

  public value: string | null = null;

  public title: string | null = null;

  constructor(value: string | null, title: string | null) {
    this.value = value;
    this.title = title;
  }

}
