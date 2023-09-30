module.exports = {
  async beforeCreate(data) {
    const userId = strapi.requestContext.get().state.user.id;
    const { title } = data.params.data;

    // Create ticket data before the post data is created
    const createdTicket = await strapi.service("api::ticket.ticket").create({
      data: {
        name: title,
      },
    });

    // Create comment data before the post data is created
    const createdComment = await strapi.service("api::comment.comment").create({
      data: {
        description: title,
        ticket: createdTicket.id,
      },
    });

    // Set the comment and user in the post model
    data.params.data.comments = [createdComment.id];
    data.params.data.users_permissions_user = userId;
  },
};
