const Comment = require("../models/comments")
const mongoose = require("mongoose")

const createComment = async (userId, title, videoId) => {
    const comment = new Comment({
        videoId: videoId,
        childernId: [],
        userId: userId,
        title: title,
    });
    return await comment.save();
};

const createCommentInsideComment = async (parentId, userId, title, videoId) => {
    const comment = new Comment({
        parentId: parentId,
        videoId: videoId,
        childernId: [],
        userId: userId,
        title: title,
    });
    const parent = await Comment.findById({ _id: parentId })
    await Comment.findByIdAndUpdate({ _id: parentId }, {
        childernId: parent.childernId.concat([comment._id])
    })
    return await comment.save();
};

const getComments = async (videoId) => {
    return await Comment.find({videoId: videoId})
}

const getComment = async (commentId) => {
    return await Comment.findById({ _id: commentId })
}

const deleteComment = async (commentId) => {
    // add recursivly and remove from list
    const comment = await Comment.findById({ _id: commentId })
    if(comment.childernId != null|undefined){
        comment.childernId.forEach(async(id) => {
            await deleteComment(id)
        });
    }
    if (comment.parentId != null|undefined) {
        const parentList = (await Comment.findById(comment.parentId)).childernId.filter((id) => id != commentId)
        await Comment.findByIdAndUpdate({ _id: comment.parentId }, {childernId: parentList})
    }
    return await Comment.findByIdAndDelete({ _id: commentId })
}

const updateComment = async (commentId, title) => {
    return await Comment.findByIdAndUpdate({ _id: commentId }, {title: title})
}

module.exports = {
    createComment, createCommentInsideComment, getComments, getComment, deleteComment, updateComment
}