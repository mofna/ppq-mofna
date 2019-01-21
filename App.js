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
  }else if(message.channel.name=="botspam"){
    if(/^>>[Cc]\s/.test(message.content)){
      var tx = message.content;
      let flg = false;
      if(/^.+\s([tT][oO][kK][kK][uU][nN]|\u7279\u8a13|\u3068\u3063\u304f\u3093)$/.test(tx)){
        flg=true;
        tx=tx.match(/^(.+)\s(?:[tT][oO][kK][kK][uU][nN]|\u7279\u8a13|\u3068\u3063\u304f\u3093)$/)[1];
      }
      tx=tx.trim();
      tx=tx.slice(4);
      var param="?param=c";
      if(/^.+\s\d$/.test(tx)){
        param+="&rarity="+tx.slice(-1);
        tx=tx.match(/^(.+)\s\d$/)[1];
      }
      tx=tx.trim();
      if(tx.length)param+="&name="+tx;
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
              let rarity=res["name"].slice(2,3)|0;
              if(!flg){
                obj["embed"]["fields"]=[
                  {name:"<<ステータス>>",value:res["charastats"]}
                ];
                if(rarity>4&&res["tkid"]!="-"&&res["tkid"]!="z"){
                  let a,hp,atk,rcv,t;
                  a=res["charastats"].split("\n");
                  hp=a[0].slice(a[0].indexOf("～")+1)|0;
                  atk=a[1].slice(a[1].indexOf("～")+1)|0;
                  rcv=a[2].slice(a[2].indexOf("～")+1)|0;
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
                }else if(rarity<=4&&res["tkid"]!="-"){
                  let a,hp,atk,rcv,t;
                  a=res["charastats"].split("\n");
                  hp=a[0].slice(a[0].indexOf("～")+1)|0;
                  atk=a[1].slice(a[1].indexOf("～")+1)|0;
                  rcv=a[2].slice(a[2].indexOf("～")+1)|0;
                  hp=hp+1000;
                  atk=atk+500;
                  rcv=rcv+200;
                  t="体力："+hp+"\n攻撃："+atk+"\n回復："+rcv;
                  obj["embed"]["fields"].push(
                    {name:"<<極ステータス>>",value:t}
                  )
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
              }else{
                if(res["tkid"]&&res["tkid"]!="-"&&res["tkid"]!="z"){
                  let q=res["type"].split("タイプ").join(""),r=res["tkid"],s="",t="",u="";
                  let color=res["color"].split("/")[0],scolor=res["color"].length>1?res["color"].split("/")[1]:false;
                  if(res["name"].indexOf("戦乙女アルル")>0)scolor="青";
                  var st = q=="体力"?10:q=="攻撃"?5:q=="回復"?2:1;
                  var disadvantage="青緑赤紫黄",normal="赤青緑黄紫",advantage="緑赤青紫黄";
	                var cnum=color=="赤"?0:color=="青"?1:color=="緑"?2:color=="黄"?3:4;
                  var per=r=="E"?[0,5,0]:r=="D"?q=="攻撃"?[3,3,5]:q=="バランス"?[4,4,8]:[4,4,6]:r=="B"||r=="C1"||r=="C2"?q=="攻撃"?[2,3,5]:q=="バランス"?[3,4,8]:[3,4,6]:q=="攻撃"?[1,2,3]:q=="バランス"?[2,3,5]:[2,3,4];
                  var condition=["怒り","怯え","混乱","麻痺","毒"];
                  per[0]="+"+per[0]+"%";
                  per[1]="+"+per[1]+"%";
                  per[2]="+"+per[2]+"%";
                  if(r=="A1"){
                    s="固定7:"+q+"+"+(40*st)+"\n";
                    s+="選択8:"+"属性盾"+per[0];
                    t="固定15:"+"お手伝い上手"+"\n";
                    t+="選択16:"+"属性盾"+per[1];
                    u="固定23:"+disadvantage.slice(cnum,cnum+1)+"属性盾"+per[2]+"\n";
                    u+="選択24:"+"体力+500／攻撃+250／回復+100";
                  }else if(r=="A2"){
                    s="固定7:"+disadvantage.slice(cnum,cnum+1)+"属性盾"+per[0]+"\n";
                    s+="選択8:"+"体力+400／攻撃+200／回復+80";
                    t="固定15:"+"お手伝い上手"+"\n";
                    t+="選択16:"+"体力+400／攻撃+200／回復+80";
                    u="固定23:"+disadvantage.slice(cnum,cnum+1)+"属性盾"+per[2]+"\n";
                    u+="選択24:"+"体力+500／攻撃+250／回復+100";
                  }else if(r=="B"){
                    s="固定7:"+q+"+"+(40*st)+"\n";
                    s+="選択8:"+"属性盾"+per[0];
                    t="固定15:"+disadvantage.slice(cnum,cnum+1)+"属性盾"+per[1]+"\n";
                    t+="選択16:"+"属性盾"+per[1];
                    u="固定23:"+disadvantage.slice(cnum,cnum+1)+"属性盾"+per[2]+"\n";
                    u+="選択24:"+"体力+500／攻撃+250／回復+100";
                  }else if(r=="C1"){
                    s="固定7:"+q+"+"+(50*st)+"\n";
                    s+="選択8:"+"属性盾"+per[0];
                    t="固定15:"+disadvantage.slice(cnum,cnum+1)+"属性盾"+per[1]+"\n";
                    t+="選択16:"+"属性盾"+per[1];
                    u="固定23:"+disadvantage.slice(cnum,cnum+1)+"属性盾"+per[2]+"\n";
                    u+="選択24:"+"体力+500／攻撃+250／回復+100";
                  }else if(r=="C2"){
                    s="固定7:"+disadvantage.slice(cnum,cnum+1)+"属性盾"+per[0]+"\n";
                    s+="選択8:"+"体力+500／攻撃+250／回復+100";
                    t="固定15:"+disadvantage.slice(cnum,cnum+1)+"属性盾"+per[1]+"\n";
                    t+="選択16:"+"体力+500／攻撃+250／回復+100";
                    u="固定23:"+disadvantage.slice(cnum,cnum+1)+"属性盾"+per[2]+"\n";
                    u+="選択24:"+"体力+500／攻撃+250／回復+100";
                  }else if(r=="D"){
                    s="固定7:"+disadvantage.slice(cnum,cnum+1)+"属性盾"+per[0]+"\n";
                    s+="選択8:"+"体力+500／攻撃+250／回復+100";
                    t="固定15:"+normal.slice(cnum,cnum+1)+"属性盾"+per[1]+"\n";
                    t+="選択16:"+"状態異常盾";
                    u="固定23:"+advantage.slice(cnum,cnum+1)+"属性盾"+per[2]+"\n";
                    u+="選択24:"+"体力+500／攻撃+250／回復+100";
                  }else if(r=="E"){
                    s="固定7:"+condition[cnum]+"盾"+"\n";
                    s+="選択8:"+"体力+500／攻撃+250／回復+100";
                    t="固定15:"+disadvantage.slice(cnum,cnum+1)+"属性盾"+per[1]+"\n";
                    t+="選択16:"+"体力+500／攻撃+250／回復+100";
                    u="固定23:"+condition[normal.indexOf(scolor)]+"盾"+"\n";
                    u+="選択24:"+"体力+500／攻撃+250／回復+100";
                  }
                  if(res["tksp"]&&res["tksp"]=="あり"){
                    if(res["name"].indexOf("かわったエコロ")>0){
                      u+="／LSSP／LSSP／LSSP";
                    }else{
                      u+="／LSSP／スキル(+)";
                    }
                  }else if(res["tksp"]&&res["tksp"]=="あり(★6)"){
                    t+="／スキル(+)";
                  }
                  if(rarity>=5){
                    obj["embed"]["fields"]=[
                      {name:"<<特訓ボード 1-8>>",value:s}
                    ];
                    if(rarity>=6){
                      obj["embed"]["fields"].push(
                        {name:"<<特訓ボード 9-16>>",value:t}
                      );
                      if(rarity>=7){
                        obj["embed"]["fields"].push(
                          {name:"<<特訓ボード 17-24>>",value:u}
                        );
                      }
                    }
                  }else{
                    obj["embed"]["fields"]=[
                      {name:"<<特訓ボード>>",value:"特訓ボードの開放に必要なレアリティが不足しています。"}
                    ];
                  }
                }else if(res["tkid"]=="-"){
                  obj["embed"]["fields"]=[
                    {name:"<<特訓ボード>>",value:"非対応キャラクターです。"}
                  ];
                }else if(res["tkid"]=="z"){
                  obj["embed"]["fields"]=[
                    {name:"<<特訓ボード>>",value:"特訓ボードの開放に必要なレアリティが未実装です。"}
                  ];
                }else{
                  obj["embed"]["fields"]=[
                    {name:"<<特訓ボード>>",value:"このキャラクターの特訓ボード情報が登録されていません。"}
                  ];
                }
                mtx.channel.send(obj);
              }
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
