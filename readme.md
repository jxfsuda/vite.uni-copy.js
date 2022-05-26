uniapp vite插件
用于 uniapp编译成功后,往dist目录复制文件

let node_env = process.env.NODE_ENV;


export default defineConfig({
	plugins: [ 
		uni(),  
		vitePluginUniCopy([{
			 node_env, // production or other
			 source: ["/components/bui-vr-preview/g3d.js","/common/config.js"] ,  //多个文件的数组
			 rootDir:   process.env.UNI_INPUT_DIR    // 项目根目录
		}])
	]
});