<template>
  <div id="app">

    <el-container :style="{'height':winHeight+'px'}">
      <el-aside :style="{'height':winHeight+'px'}">
          <el-menu :default-openeds="['1','2', '3']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-location-outline"></i>起始页面</template>

              <el-menu-item index="2-4-1"><router-link to='home'>欢迎页面</router-link></el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i>舆情报告</template>           
            
              <el-menu-item index="2-4-1"><router-link to='report'>全部舆情</router-link></el-menu-item>

              <el-menu-item index="2-4-1"><router-link to='positivereport'>正面舆情</router-link></el-menu-item>
              
              <el-menu-item index="2-4-1"><router-link to='negativereport'>负面舆情</router-link></el-menu-item>
              
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-setting"></i>舆情设置</template>            
              
                <el-menu-item index="3-1">
                  <router-link to='keywords'>舆情关键字设置</router-link>
                </el-menu-item>

                <el-menu-item index="3-2">
                    <router-link to='alarm'>舆情报警设置</router-link>
                
                </el-menu-item>          
              
            </el-submenu>
          </el-menu>
        </el-aside>
      
      <el-container class="main" :style="{'height':winHeight+'px'}">
        <router-view></router-view>
      </el-container>

    </el-container>

    <!-- <router-link to="/">首页</router-link>
    <router-link to="/report">舆情报表</router-link>
    <router-link to="/keywords">舆情关键词设置</router-link>
    <router-link to="/alarm">舆情报警设置</router-link> -->
   
  </div>
</template>

<script>


  var path=require('path');
  export default {
    name: 'electronproject',

    data(){
        return{
          winHeight:document.documentElement.clientHeight
        }
    },
    sockets:{
      connect: function(){  //vue客户端和socket.io服务器端建立连接以后触发的方法

        console.log('socket connected')
      },
      serverEmit: function(val){  //接收服务器广播的数据

          console.log(val);
          const option = {
            title: '腾讯新闻',
            body: val.title
            // icon: path.join(__dirname,'assets/favicon2.ico')
          }
          const myNotification = new window.Notification(option.title,option);

          myNotification.onclick = () =>{
            // console.log('点击了');
            this.$electron.shell.openExternal(val.url);
          }
            
      }
    },
    mounted() {

      //监听网络变化

      window.addEventListener('online', function(){

        console.log('有网络了')
      });
      window.addEventListener('offline', function(){

        const option = {
           title: '提示!',
           body: '网络已经断开，请检查您的网络设置!',
          //  icon: path.join('main-process/favicon2.ico')
         }
          const myNotification = new window.Notification(option.title,option);


          myNotification.onclick = () =>{

            console.log('点击了');
          }
          
      });


    //监听右键菜单

    window.addEventListener('contextmenu',(e)=>{

      e.preventDefault();

 
      //给主进程广播事件   注意this指向

      this.$electron.ipcRenderer.send('contextmenu');

    })


      window.onresize=()=>{

        this.winHeight=document.documentElement.clientHeight;
      }
    },
  }
</script>

<style lang="scss">

*{

  margin:0px;
  padding:0px;
}

.el-aside {
    width: 200px!important;
    background: #eee;
    
    a{
     color: #333; 
     display: block;
     text-decoration: none;    
    }
    .el-menu{
      background: #eee;
    }
   
  }

  .main{

    overflow-y: auto;   /*溢出  出现滚动条*/
    
    // overflow-x: hidden;  

    padding:10px;

    width: 100%;
    
  }

  .content{

    width: 100%;
  }



//全局表格

.electron-table{

  border-collapse: collapse;     //给表格设置合并边框模型

  width: 100%;
  

}
.electron-table tr td,.electron-table tr th{

  height: 30px;
  line-height: 30px;

  border:1px solid #eee;

  text-align: center;

  font-size: 14px;

  padding:5px;
}
/*全局布局*/

 .main_top{

    background: none repeat scroll 0 0 #FFFCED;

    border: 1px solid #FFFCED;
    line-height: 20px;
    padding: 10px;
    margin-bottom: 10px;
    overflow: hidden;
  
 }
 .page{

   text-align: center;

   margin-top:20px;
 }


.v-modal{

  opacity: 0.8!important;
}

.router-link-active{

  color:red!important;
}

</style>
