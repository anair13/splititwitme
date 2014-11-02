class CreateSplits < ActiveRecord::Migration
  def change
    create_table :splits do |t|
      t.string :data

      t.timestamps
    end
  end
end
