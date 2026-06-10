type ApiSuccessOptions<TData> = {
  message: string;
  data?: TData;
  status?: number;
};

type ApiErrorOptions<TErrors> = {
  message: string;
  status?: number;
  errors?: TErrors;
};

export function apiSuccess<TData>({
  message,
  data,
  status = 200,
}: ApiSuccessOptions<TData>) {
  return Response.json(
    {
      success: true,
      message,
      data,
    },
    {
      status,
    },
  );
}

export function apiError<TErrors>({
  message,
  status = 400,
  errors,
}: ApiErrorOptions<TErrors>) {
  return Response.json(
    {
      success: false,
      message,
      errors,
    },
    {
      status,
    },
  );
}
