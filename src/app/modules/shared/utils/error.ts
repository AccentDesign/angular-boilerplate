import { HttpErrorResponse } from "@angular/common/http";
import { HttpValidationError } from "@modules/shared/interfaces/http-validation-error";

export function FormatHttpError(error: HttpErrorResponse): string[] {
  const defaultError = [error.message];
  if (!error.error) {
    return defaultError;
  }
  const detail = error.error.detail;
  if (typeof detail === "string") {
    return [detail];
  }
  if (Array.isArray(detail) && error.status === 422) {
    const errors = detail as HttpValidationError[];
    return errors.map((e) => `${e.loc[e.loc.length - 1]}, ${e.msg}`);
  }
  return defaultError;
}
