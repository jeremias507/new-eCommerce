export const validatorSchema = (schema) => async (req, res, next) => {
  try {
    await schema.parse(req.body);
    next();
  } catch (error) {
    return res
      .status(400)
      .json({
        message: error.errors.map((error) => error.message),
        error: true,
        succes: false,
      });
  }
};
