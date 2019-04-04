package name.feinimouse.study;

import java.io.FileReader;
import java.net.URL;
import java.net.URLClassLoader;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

/**
 * 使用Rhino引擎实现js脚本代码的运行
 */
class JavaScriptInJava {
    private static ScriptEngineManager manager;
    private static ScriptEngine engine;
    public static final String JS_PATH = "file:/" + "E:/workspace/my-note/code/java/name/feinimouse/study/";
    static {
        manager = new ScriptEngineManager();
        engine = manager.getEngineByName("javascript");
    }

    public static Object eval(String str) throws ScriptException {
        return engine.eval(str);
    }

    public static void run(String name) throws Exception {
        URL url = new URL(JS_PATH);
        URLClassLoader loader = new URLClassLoader(new URL[] {url});
        url = loader.getResource(name);
        FileReader fReader = new FileReader(url.getPath());
        engine.eval(fReader);
        fReader.close();
        loader.close();
    }
    public static void test() throws ScriptException {
        engine.put("my", "cyh");
        engine.eval("var band = { name: 'hhw', member: {vocal: 'kkr', drum: 'kanon'}};");
        engine.eval("print(JSON.stringify(band));");
        System.out.println(engine.get("my"));
    }
}
