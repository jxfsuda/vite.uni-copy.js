/**
 *   初衷是复制 g3d.js  因为这个库不是umd规范,uni貌似不会追踪到他
 * 
	实现了 uni编译完成后 ,复制某些文件到最终目录中去. 
	有点类似 ant 或 maven的copy_resource
 
 */ 
var fs = require('fs');
var path = require('path');
  

export default (options)=> {
	var name = 'vite-plugin-copy-uniapp_config';

	return {
		name: name,
		enforce: 'post', 
		closeBundle:()=>{  //buildEnd之后运行
			options.forEach(function(option) {
					// console.log("closeBundle 触发");
					var node_env = option.node_env;
					var source = option.source;
					
					let env_name="dev";
					if(node_env=="production"){
						env_name="build";
					} 
					let rootDir = option.rootDir
					let destDir = rootDir+"/unpackage/dist/"+ env_name +"/mp-weixin/";
					
					try {
						 
						 for(let f of source){
							 let ff = rootDir+ f
							 let df = destDir+ f
							 
							 let destPath = path.dirname(df)
							 if(!fs.existsSync(destPath)){  //多级目录下,如果目录没有被uni编译,那么认为组件没有被使用
							 	//fs.mkdirSync(destDir);
							 	console.log(destPath+" 没有创建,认为组件没有被使用,略过");  //这里的逻辑可以修改,甚至可以配置未是否强制覆盖等
								continue;
							 }
							 fs.readFile(ff,(err,data)=>{
							     if(!err){//读取成功  
							         fs.writeFile(df,data,(err)=>{
							             if(!err){
							                 console.log(f+" 拷贝成功");
							             }else{
							                 console.log(fs+" 拷贝失败",err);
							             }
							         })
							     }else{
									 console.error(f+" 读取错误,无法复制")
								 }
							 }) 
							 
						 }
						 
					} catch (err) {
						throw new Error(err);
					}
					 
			});
		}
		
	};
} 
