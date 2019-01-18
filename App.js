// Response for Uptime Robot
const ht = require('http');
const URL = process.env.url;

const http = require('http');
var mtx;
let Tokkun=[];
Tokkun["バランス7A2"]=[3200,1600,640];
Tokkun["バランス7C2"]=[3400,1700,680];
Tokkun["バランス7D"]=[2900,1450,580];
Tokkun["バランス7E"]=[3400,1700,680];
Tokkun["バランス6A2"]=[2400,1200,480];
Tokkun["バランス6C2"]=[2600,1300,520];
Tokkun["バランス6D"]=[2100,1050,420];
Tokkun["バランス6E"]=[2600,1300,520];
Tokkun["バランス5A2"]=[1700,850,340];
Tokkun["バランス5C2"]=[1800,900,360];
Tokkun["バランス5D"]=[1800,900,360];
Tokkun["バランス5E"]=[1800,900,360];
Tokkun["体力7A1"]=[2800,1200,480];
Tokkun["体力7B"]=[2800,1200,480];
Tokkun["体力7C1"]=[2900,1200,480];
Tokkun["体力7D"]=[2900,1450,580];
Tokkun["体力7E"]=[3400,1700,680];
Tokkun["体力6A1"]=[2000,800,320];
Tokkun["体力6B"]=[2000,800,320];
Tokkun["体力6C1"]=[2100,800,320];
Tokkun["体力6D"]=[2100,1050,420];
Tokkun["体力6E"]=[2600,1300,520];
Tokkun["体力5A1"]=[1700,650,260];
Tokkun["体力5B"]=[1700,650,260];
Tokkun["体力5C1"]=[1800,650,260];
Tokkun["体力5D"]=[1800,900,360];
Tokkun["体力5E"]=[1800,900,360];
Tokkun["攻撃7A1"]=[2400,1400,480];
Tokkun["攻撃7B"]=[2400,1400,480];
Tokkun["攻撃7C1"]=[2400,1450,480];
Tokkun["攻撃7D"]=[2900,1450,580];
Tokkun["攻撃7E"]=[3400,1700,680];
Tokkun["攻撃6A1"]=[1600,1000,320];
Tokkun["攻撃6B"]=[1600,1000,320];
Tokkun["攻撃6C1"]=[1600,1050,320];
Tokkun["攻撃6D"]=[2100,1050,420];
Tokkun["攻撃6E"]=[2600,1300,520];
Tokkun["攻撃5A1"]=[1300,850,260];
Tokkun["攻撃5B"]=[1300,850,260];
Tokkun["攻撃5C1"]=[1300,900,260];
Tokkun["攻撃5D"]=[1800,900,360];
Tokkun["攻撃5E"]=[1800,900,360];
Tokkun["回復7A1"]=[2400,1200,560];
Tokkun["回復7B"]=[2400,1200,560];
Tokkun["回復7C1"]=[2400,1200,580];
Tokkun["回復7D"]=[2900,1450,580];
Tokkun["回復7E"]=[3400,1700,680];
Tokkun["回復6A1"]=[1600,800,400];
Tokkun["回復6B"]=[1600,800,400];
Tokkun["回復6C1"]=[1600,800,420];
Tokkun["回復6D"]=[2100,1050,420];
Tokkun["回復6E"]=[2600,1300,520];
Tokkun["回復5A1"]=[1300,650,340];
Tokkun["回復5B"]=[1300,650,340];
Tokkun["回復5C1"]=[1300,650,360];
Tokkun["回復5D"]=[1800,900,360];
Tokkun["回復5E"]=[1800,900,360];

http.createServer(function(request, response)
{
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Discord bot is active now \n');
}).listen(3000);

// Discord bot implements
const discord = require('discord.js');
const client = new discord.Client();

client.on('ready', message =>
{
	console.log('bot is ready!');
});

client.on('message', message =>
{
  if(message.author.bot){ return; }
  if(message.channel.name=="実況"){
    message.channel.send("'\n"+message.content+" @everyone");
    message.delete(2000);
  }else{
	//if(message.isMemberMentioned(client.user)){
		//message.reply( '呼びましたか？' );
    if(/^>>[Cc]\s/.test(message.content)){
      var tx = message.content;
      tx=tx.trim();
      tx=tx.slice(4);
      var param="?param=c";
      if(/^.+\s\d$/.test(tx)){
        param+="&rarity="+tx.slice(-1);
        tx=tx.match(/^(.+)\s\d$/)[1];
      }
      tx=tx.trim();
      if(tx.length)param+="&name="+tx;
      console.log(param);
      mtx=message;
      ht.get(URL+encodeURI(param), (res) => {
        let body = '';
        res.setEncoding('utf8');

        res.on('data', (chunk) => {
            body += chunk;
        });

        res.on('end', (res) => {
            res = JSON.parse(body);
            //console.log(res);
            //mtx.channel.send(JSON.stringify(res));
            if(res["stats"]=="data"){
              let obj = {};
              let r = client.emojis.find(f => f.name==="red" );
              let b = client.emojis.find(f => f.name==="blue" );
              let g = client.emojis.find(f => f.name==="green" );
              let y = client.emojis.find(f => f.name==="yellow" );
              let p = client.emojis.find(f => f.name==="purple" );
              let cl = res["color"];
              if(r&&b&&g&&y&&p){
                cl=cl.replace(/赤/g,r.toString()).replace(/青/g,b.toString()).replace(/緑/g,g.toString()).replace(/黄/g,y.toString()).replace(/紫/g,p.toString());
              }
              obj["embed"]={};
              obj["embed"]["color"]=7506394;
              obj["embed"]["timestamp"]=new Date();
              obj["embed"]["footer"]={"text":"mof_bot | @mof_na_"};
              obj["embed"]["title"]=res["name"];
              obj["embed"]["thumbnail"]={url:res["img"]};
              obj["embed"]["description"]="属性："+cl+"\n"+res["type"];
              obj["embed"]["fields"]=[
                {name:"<<ステータス>>",value:res["charastats"]}
              ];
              if(res["tkid"]!="-"&&res["tkid"]!="z"){
                let a,hp,atk,rcv,t;
                a=res["charastats"].split("\n");
                hp=a[0].slice(a[0].indexOf("～")+1)|0;
                atk=a[1].slice(a[1].indexOf("～")+1)|0;
                rcv=a[2].slice(a[2].indexOf("～")+1)|0;
                let rarity=res["name"].slice(2,3)|0;
                hp=hp+Tokkun[res["type"].split("タイプ").join("")+rarity+res["tkid"]][0];
                atk=atk+Tokkun[res["type"].split("タイプ").join("")+rarity+res["tkid"]][1];
                rcv=rcv+Tokkun[res["type"].split("タイプ").join("")+rarity+res["tkid"]][2];
                t="体力："+hp+"\n攻撃："+atk+"\n回復："+rcv;
                obj["embed"]["fields"].push(
                  {name:"<<極ステータス>>",value:t}
                )
                if(res["tksp"]&&((res["tksp"]=="あり"&&rarity==7)||(res["tksp"]=="あり(★6)"&&rarity>=6))){
                  hp-=500;atk-=250;rcv-=100;
                  t="体力："+hp+"\n攻撃："+atk+"\n回復："+rcv;
                  obj["embed"]["fields"].push(
                    {name:"<<極ステータス(SP取得)>>",value:t}
                  );
                }
              }
              /************************************
              if(res["ls"]){
                obj["embed"]["fields"].push({name:res["lsname"].replace("スキル>>","スキル>>\n "),value:res["ls"]});
              }else{
                obj["embed"]["fields"].push({name:"<<リーダースキル>>",value:"なし"});
              }
              if(res["as"]){
                obj["embed"]["fields"].push({name:res["asname"].replace("スキル>>","スキル>>\n "),value:res["as"]});
              }else{
                obj["embed"]["fields"].push({name:"<<スキル>>",value:"なし"});
              }
              if(res["bs"]){
                obj["embed"]["fields"].push({name:res["bsname"].replace("スキル>>","スキル>>\n "),value:res["bs"]});
              }
              ************************************/
              obj["embed"]["fields"].push({name:"<<コンビネーション>>",value:res["combi"]});
              mtx.channel.send(obj);
              //console.log(res["img"]);
            }else if(res["stats"]=="success"){
              let obj = {};
              obj["embed"]={};
              obj["embed"]["color"]=7506394;
              obj["embed"]["timestamp"]=new Date();
              obj["embed"]["footer"]={"text":"mof_bot | @mof_na_"};
              obj["embed"]["description"]=res["txt"];
              mtx.channel.send(obj);
            }else if(res["stats"]=="error"){
              let obj = {};
              obj["embed"]={};
              obj["embed"]["color"]=0xff0060;
              obj["embed"]["timestamp"]=new Date();
              obj["embed"]["footer"]={"text":"mof_bot | @mof_na_"};
              obj["embed"]["description"]=res["txt"];
              mtx.channel.send(obj);
            }
        });
      }).on('error', (e) => {
          let obj = {};
          obj["embed"]={};
          obj["embed"]["color"]=0xff0060;
          obj["embed"]["timestamp"]=new Date();
          obj["embed"]["footer"]={"text":"mof_bot | @mof_na_"};
          obj["embed"]["description"]="通信エラーまたはサーバーエラーによって情報の取得に失敗しました。";
          mtx.channel.send(obj);
      });
    }
  }
});

if(process.env.DISCORD_BOT_TOKEN == undefined)
{
	console.log('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}
//console.log(("テキスト").length);
client.login( process.env.DISCORD_BOT_TOKEN );
