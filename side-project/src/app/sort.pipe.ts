import { Pipe, PipeTransform } from "@angular/core";
import { Server } from "./types";

@Pipe({
  name: "sort",
})
export class SortPipe implements PipeTransform {
  transform(value: Array<Server>): Array<Server> {
    return value.sort((firstServer, secondServer) => {
      if (firstServer.name < secondServer.name) {
        return -1;
      }
      if (firstServer.name > secondServer.name) {
        return 1;
      }
      return 0;
    });
  }
}
