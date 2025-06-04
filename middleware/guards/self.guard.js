const { sendErrorresponse } = require("../../helpers/send_error_response");

module.exports = function authorizeUserOrAdmin(req, res, next) {
  try {
    const user = req.user;
    if (!user || !user.id) {
      return sendErrorresponse(
        { message: "Token noto'g'ri yoki foydalanuvchi aniqlanmadi" },
        res,
        401
      );
    }

    const roles = user.roles || [];
    const isAdmin = roles.some((role) => role.name === "admin");

    const targetId = Number(req.params.id);
    if (Number.isNaN(targetId)) {
      return sendErrorresponse({ message: "ID noto'g'ri" }, res, 400);
    }

    if (isAdmin || user.id === targetId) {
      return next();
    }

    return sendErrorresponse(
      { message: "Siz faqat o'zingizning ma'lumotlaringizga kira olasiz" },
      res,
      403
    );
  } catch (err) {
    return sendErrorresponse(
      { message: "Ruxsat tekshiruvida xatolik yuz berdi" },
      res,
      500
    );
  }
};
