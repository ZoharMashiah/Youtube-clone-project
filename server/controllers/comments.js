const {
  createComment,
  createCommentInsideComment,
  getComments,
  getComment,
  deleteComment,
  updateComment,
  deleteAllComment,
} = require("../services/comments");

const postComment = async (req, res) => {
  const { pid } = req.params;
  try {
    res.status(200).json(await createComment(req.body.user, req.body.title, pid));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postCommentInsideComment = async (req, res) => {
  const { pid, commentId } = req.params;
  try {
    res.status(200).json(await createCommentInsideComment(commentId, req.body.user, req.body.title, pid));
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ error: error.message });
  }
};

const getAllComments = async (req, res) => {
  const { pid } = req.params;
  try {
    res.status(200).json(await getComments(pid));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOneComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    res.status(200).json(await getComment(commentId));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteOneComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    res.status(200).json(await deleteComment(commentId));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteComments = async (req, res) => {
  const { pid } = req.params;
  try {
    res.status(200).json(await deleteAllComment(pid));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateOneComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    res.status(200).json(await updateComment(commentId, req.body.title));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postComment,
  postCommentInsideComment,
  getAllComments,
  getOneComment,
  deleteOneComment,
  updateOneComment,
  deleteComments,
};
