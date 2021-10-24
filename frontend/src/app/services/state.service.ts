import { Injectable } from "@angular/core";
import { MatTableState } from "../helpers/mattable.state";

@Injectable({ providedIn: 'root' })
export class StateService {
    public usersListState = new MatTableState('pseudo', 'asc', 5);
}