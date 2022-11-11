module QueryHelper
    extend ActiveSupport::Concern
    module ClassMethods
        # DOCU: Select only one table record
        # Triggered by: Models
        # Requires: query_statement - SELECT
        # Returns: {data}
        def query_select_one(query_statement)
            return ActiveRecord::Base.connection.select_one(ActiveRecord::Base.send(:sanitize_sql_array, query_statement))
        end

        # DOCU: Select multiple table records
        # Triggered by: Models
        # Requires; query_statement - SELECT
        # Returns: [{data_1}, {data_2}, ... {data_n}]
        def query_select_all(query_statement)
            return ActiveRecord::Base.connection.exec_query(ActiveRecord::Base.send(:sanitize_sql_array, query_statement)).to_hash
        end

        # DOCU: Update table record/s
        # Triggered by: Models
        # Requires; query_statement - UPDATE
        # Returns: Affected rows count
        def query_update(query_statement)
            return ActiveRecord::Base.connection.update(ActiveRecord::Base.send(:sanitize_sql_array, query_statement))
        end

        # DOCU: Delete table record/s
        # Triggered by: Models
        # Requires; query_statement - DELETE
        # Returns: Affected rows count
        def query_delete(query_statement)
            return ActiveRecord::Base.connection.delete(ActiveRecord::Base.send(:sanitize_sql_array, query_statement))
        end

        # DOCU: Insert new table record/s
        # Triggered by: Models
        # Requires; query_statement - INSERT
        # Returns: Last new ID
        def query_insert(query_statement)
            return ActiveRecord::Base.connection.insert(ActiveRecord::Base.send(:sanitize_sql_array, query_statement))
        end
    end
end