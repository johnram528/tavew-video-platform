# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user = User.create(username: 'johnram528', email: 'johnram528@gmail.com', password:'password')

file1 = File.open('/Users/master/Downloads/Girl_Checks_Phone.mp4')
file2 = File.open('/Users/master/Downloads/uscenes_h-264_hd_test.mp4')
file3 = File.open('/Users/master/Downloads/mov_bbb.mp4')

user.videos.create(title: 'test1', description: 'test1', file: file1)
user.videos.create(title: 'test2', description: 'test2', file: file2)
user.videos.create(title: 'test3', description: 'test3', file: file3)