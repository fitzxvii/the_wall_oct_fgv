class Comment < ApplicationRecord
    include :: QueryHelper

    # DOCU: Insert new comment of the current user below the selected message
    # Triggered by: CommentsController.create_comment
    # Requires: params - user_id, message_id, comment
    # Returns: {:status => true/false, :result => {id, comment}, :error => error}
    def self.create_comment(params)
        response_data = {:status => false, :result => {}, :error => nil}

        begin
            new_comment_id = query_insert([
                "INSERT INTO comments (message_id, user_id, comment, created_at, updated_at)
                VALUES (?, ?, ?, NOW(), NOW());", params[:message_id], params[:user_id], params[:comment]
            ])

            if new_comment_id > 0
                response_data[:status] = true
                response_data[:result] = {:id => new_comment_id, :comment => params[:comment]}
            else
                response_data[:error] = "Insert new comment failed."
            end
        rescue Exception => ex
            response_data[:error] = ex
        end

        return response_data
    end

    # DOCU: Delete the select comment of the current user
    # Triggered by: CommentsController.delete_comment
    # Requires: params - user_id, comment_id
    # Returns: {:status => true/false, :result => comment_id, :error => error}
    def self.delete_comment(params)
        response_data = {:status => false, :result => {}, :error => nil}

        begin
            comment_to_delete = self.check_comment_owner(params)

            if comment_to_delete[:status]
                delete_comment = query_delete(["DELETE FROM comments WHERE id = ?;", params[:comment_id]])

                if delete_comment > 0
                    response_data[:status] = true
                    response_data[:result] = params[:comment_id]
                else
                    response_data[:error] = "Nothing deleted in comments table."
                end
            else
                raise comment_to_delete[:error]
            end
        rescue Exception => ex
            response_data[:error] = ex
        end

        return response_data
    end

    private
        # DOCU: Check if the owner of the comment is the current user before alterations
        # Triggered by: self.delete_comment
        # Requires: params - user_id, comment_id
        # Returns: {:status => true/false, :result =>{}, :error => error}
        def self.check_comment_owner(params)
            response_data = {:status => false, :result => {}, :error => nil}

            begin
                comment_to_check = query_select_one(["SELECT id, user_id, comment FROM comments WHERE id = ? AND user_id = ?;", params[:comment_id], params[:user_id]])

                (comment_to_check.present?) ? response_data[:status] = true : response_data[:error] = "The current user is not the comment owner."
            rescue Exception => ex
                response_data[:error] = ex
            end

            return response_data
        end
end
