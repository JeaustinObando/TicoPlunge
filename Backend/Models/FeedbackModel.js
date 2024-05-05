const mongoose = require("mongoose");
const Joi = require("joi");

const feedbackSchema = new mongoose.Schema({
  comentario: { type: String, required: true },
  usuario: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

const validateFeedback = (data) => {
  const schema = Joi.object({
    comentario: Joi.string().required().label("Comentario"),
    usuario: Joi.string().required().label("Usuario"),
    rating: Joi.number().integer().min(1).max(5).required().label("Rating"),
  });
  return schema.validate(data);
};

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = { Feedback, validateFeedback };
