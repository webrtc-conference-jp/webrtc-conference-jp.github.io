# サイトビルド方法

## ローカルでの確認

- jekyllコマンドが事前にインストールすること

```
$ git clone git@github.com:webrtc-conference-jp/webrtc-conference-jp.github.io.git
$ git checkout branch-name
$ jekyll serve
```

## サーバ上での確認

1. GitHubの指定BranchにPushすると自動デプロイされる

 - paas_test Branch : テスト環境用ブランチ
 - master : 本番環境用ブランチ

 * テスト環境用ブランチにはBasic認証をかけるための設定が入っている

   config.ru
   ```
   use Rack::Auth::Basic do |username, password|
     username == "webrtcconfjapan" && password == "2016"
   end
   ```

----

## Cloudn PaaS上へのデプロイ（初回にAppを作る場合のみ実施）

1.GUDツールインストール

 - ダウンロードは[こちら](http://www.cloudn-service.com/guide/manuals/html/paas-v2/prepare/cli_install/download.html)

2.初期設定（認証情報は個別にご確認下さい）
```
$ gud login
API endpoint: https://api.paas.jp-e1.cloudn-service.com

Email>

Password>
Authenticating...
OK

Targeted org cln100152043

Targeted space websites



API endpoint:   https://api.paas.jp-e1.cloudn-service.com (API version: 2.4.0)
User:           cln100152043@cloudnpaas.com
Org:            cln100152043
Space:          websites
SR5-Yusuke:webrtc-conference-jp yusuke$
```

3.PUSH
テスト環境
```
$ gud push webrtc-conference-jp-test -b https://github.com/yusuke84/heroku-buildpack-ruby-jekyll.git
```

本番環境
```
$ gud push webrtc-conference-jp-b https://github.com/yusuke84/heroku-buildpack-ruby-jekyll.git
```

4.デプロイ結果確認
```
SR5-Yusuke:webrtc-conference-jp yusuke$ gud push webrtc-conference-jp-test -b https://github.com/yusuke84/heroku-buildpack-ruby-jekyll.git
Updating app webrtc-conference-jp-test in org cln100152043 / space websites as AYCT09LRCMIJG9TCE3QI...
OK

Uploading webrtc-conference-jp-test...
Uploading app files from: /Users/yusuke/WebstormProjects/webrtc-conference-jp
Uploading 3.6M, 240 files
OK

Stopping app webrtc-conference-jp-test in org cln100152043 / space websites as AYCT09LRCMIJG9TCE3QI...
OK

Starting app webrtc-conference-jp-test in org cln100152043 / space websites as AYCT09LRCMIJG9TCE3QI...
OK
-----> Downloaded app package (3.2M)
-----> Downloaded app buildpack cache (13M)
Cloning into '/tmp/buildpacks/heroku-buildpack-ruby-jekyll'...
-----> Installing dependencies using Bundler version 1.3.0.pre.5
       Running: bundle install --without development:test --path vendor/bundle --binstubs vendor/bundle/bin --deployment
       Using blankslate (2.1.2.4)
       Using fast-stemmer (1.0.2)
       Using classifier-reborn (2.0.3)
       Using coffee-script-source (1.9.1.1)
       Using execjs (2.6.0)
       Using coffee-script (2.4.1)
       Using colorator (0.1)
       Using daemons (1.2.3)
       Using eventmachine (1.0.8)
       Using ffi (1.9.10)
       Using jekyll-coffeescript (1.0.1)
       Using jekyll-gist (1.3.4)
       Using jekyll-paginate (1.1.0)
       Using sass (3.4.19)
       Using jekyll-sass-converter (1.3.0)
       Using rb-fsevent (0.9.6)
       Using rb-inotify (0.9.5)
       Using listen (3.0.3)
       Using jekyll-watch (1.3.0)
       Using kramdown (1.9.0)
       Using liquid (2.6.3)
       Using mercenary (0.3.5)
       Using posix-spawn (0.3.11)
       Using yajl-ruby (1.2.1)
       Using pygments.rb (0.6.3)
       Using redcarpet (3.3.3)
       Using safe_yaml (1.0.4)
       Using parslet (1.5.0)
       Using toml (0.1.2)
       Using jekyll (2.5.3)
       Using rack (1.6.4)
       Using rack-jekyll (0.4.2)
       Using thin (1.6.4)
       Using bundler (1.3.0.pre.5)
       Cannot write a changed lockfile while frozen.
       Your bundle is complete! It was installed into ./vendor/bundle
       Cleaning up the bundler cache.
       Building jekyll site
       Configuration file: /tmp/staged/app/_config.yml
       Source: /tmp/staged/app
       Destination: /tmp/staged/app/_site
       Generating...
       done.
       Auto-regeneration: disabled. Use --watch to enable.
-----> Uploading droplet (20M)

0 of 1 instances running, 1 starting
1 of 1 instances running

App started

Showing health and status for app webrtc-conference-jp-test in org cln100152043 / space websites as AYCT09LRCMIJG9TCE3QI...
OK

requested state: started
instances: 1/1
usage: 256M x 1 instances
urls: webrtc-conference-jp-test.paas.jp-e1.cloudn-service.com
zone:

     state     since                    cpu    memory          disk
#0   running   2015-11-02 02:08:06 AM   0.0%   36.7M of 256M   67.5M of 2G
```