namespace :heroku do
  desc "TODO"
  task deploy: :environment do
  	puts 'Deploying site to Heroku ...'
  	release_name = "release-#{Time.now.utc.strftime("%Y%m%d%H%M%S")}"
    puts "Tagging release as '#{release_name}'"
    puts `git tag -a #{release_name} -m 'Tagged release'`
    puts `git push --tags heroku`
    puts `git push heroku master`
    puts 'Running database migrations ...'
    puts `heroku rake db:migrate`
    puts 'All done!'
  end

  desc "TODO"
  task rollback: :environment do
  	releases = `git tag`.split("\n").select { |t| t[0..7] == 'release-' }.sort
    current_release = releases.last
    previous_release = releases[-2] if releases.length >= 2
    if previous_release
      puts "Rolling back to '#{previous_release}' ..."
      puts `git push -f heroku #{previous_release}:master`
      puts "Deleting rollbacked release '#{current_release}' ..."
      puts `git tag -d #{current_release}`
      puts `git push heroku :refs/tags/#{current_release}`
      puts 'All done!'
    else
      puts "No release tags found - can't roll back!"
      puts releases
    end
  end

end
