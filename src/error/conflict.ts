import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";

class ConflictError extends CustomAPIError {
  constructor(message:any) {
    super(message, StatusCodes.CONFLICT);
  }
}

export default ConflictError;
