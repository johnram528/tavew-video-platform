# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user = User.first

file1 = File.open('public/system/videos/files/000/000/001/original/Girl_Checks_Phone.mp4')
file2 = File.open('public/system/videos/files/000/000/004/original/uscenes_h-264_hd_test.mp4')


user.videos.create(title: 'test1', description: 'test1', file: file1)
user.videos.create(title: 'test2', description: 'test2', file: file2)


