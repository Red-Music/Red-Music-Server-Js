const { uploadMdware } = require("../middleware/upload");

const fileUpload = async (req, res) => {
  try {
    const { Location } = await uploadMdware(req.file);

    return res.status(200).json({ message: "파일 업로드 성공", url: Location });
  } catch (e) {
    console.error(e);
    return e;
  }
};

module.exports = { fileUpload };
