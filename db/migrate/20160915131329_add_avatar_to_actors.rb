class AddAvatarToActors < ActiveRecord::Migration
  def change
    add_column :actors, :avatar, :string
  end
end
