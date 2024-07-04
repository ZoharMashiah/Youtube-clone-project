const Comment = require("../models/Comment");
const mongoose = require("mongoose");
const Video = require("../models/Video")

const createComment = async (user, title, videoId) => {
  const comment = await Comment.create({
    videoId: videoId,
    childernId: [],
    user: user,
    title: title,
  });

  const video = await Video.findById({ _id: videoId })
  const videoList = [...video.comments,comment._id]
  // add recursivly and remove from list
  await Video.findByIdAndUpdate({ _id: video._id }, { comments: videoList });

  return comment;
};

const createCommentInsideComment = async (parentId, user, title, videoId) => {
  const comment = new Comment({
    parentId: parentId,
    videoId: videoId,
    childernId: [],
    user: user,
    title: title,
  });
  const parent = await Comment.findById({ _id: parentId });
  await Comment.findByIdAndUpdate(
    { _id: parentId },
    {
      childernId: parent.childernId.concat([comment._id]),
    }
  );
  return await comment.save();
};

const getComments = async (videoId) => {
  return await Comment.find({ videoId: videoId });
};

const getComment = async (commentId) => {
  return await Comment.findById({ _id: commentId });
};

const deleteComment = async (commentId) => {
  // remove the comment from the video
  const comment = await Comment.findById({ _id: commentId })
  const video = await Video.findById({ _id: comment.videoId })
  const videoList = await video.comments.filter((comment) => comment._id != commentId)
  // add recursivly and remove from list
  await Video.findByIdAndUpdate({ _id: video._id }, { comments: videoList });
    if(comment.childernId != null|undefined){
        comment.childernId.forEach(async(id) => {
            await deleteComment(id)
        });
    }
    if (comment.parentId != null | undefined) {
        const parent = await Comment.findById(comment.parentId)
        if (parent != null) {
            const parentList = await parent.childernId.filter((id) => id != commentId)
            await Comment.findByIdAndUpdate({ _id: comment.parentId }, {childernId: parentList})
        }
    }
    return await Comment.findByIdAndDelete({ _id: commentId })
}

const deleteAllComment = async (videoId) => {
  // remove the comments from the video
    await Video.findByIdAndUpdate({ _id: videoId }, {
    comments: []
    })
    return await Comment.deleteMany({ videoId: videoId })
}
//  // add recursivly and remove from list
// const comment = await Comment.findById({ _id: commentId });
// if ((comment.childernId != null) | undefined) {
//   comment.childernId.forEach(async (id) => {
//     await deleteComment(id);
//   });
// }
// if ((comment.parentId != null) | undefined) {
//   const parentList = (await Comment.findById(comment.parentId)).childernId.filter((id) => id != commentId);
//   await Comment.findByIdAndUpdate({ _id: comment.parentId }, { childernId: parentList });
// }
// return await Comment.findByIdAndDelete({ _id: commentId });
// };

const updateComment = async (commentId, title) => {
  return await Comment.findByIdAndUpdate({ _id: commentId }, { title: title });
};

module.exports = {
  createComment,
  createCommentInsideComment,
  getComments,
  getComment,
  deleteComment,
  updateComment,
  deleteAllComment
};
