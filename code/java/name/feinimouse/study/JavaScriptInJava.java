package name.feinimouse.study;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

/**
 * 使用Rhino引擎实现js脚本代码的运行
 */
public class JavaScriptInJava {
    private static ScriptEngineManager manager;
    private static ScriptEngine engine;
    public static final String JS_PATH = "code/java/name/feinimouse/study";
    static {
        manager = new ScriptEngineManager();
        engine = manager.getEngineByName("javascript");
    }


    public static Object eval(String str) throws ScriptException {
        return engine.eval(str);
    }

    public static void run(String name) throws Exception {
        File file = new File(JS_PATH, name);
        if (!file.exists()) {
            System.out.println("js文件不存在");
            return;
        }
        try (
            var fr = new FileReader(file);
            var br = new BufferedReader(fr);
        ) {
            String js = "";
            String temp = null;
            while ((temp = br.readLine()) != null ) {
                js += temp;
            }
            System.out.println(js);
            engine.eval(js);
        }
    }
    public static void test() throws ScriptException {
        engine.put("my", "cyh");
        engine.eval("var band = { name: 'hhw', member: {vocal: 'kkr', drum: 'kanon'}};");
        engine.eval("print(JSON.stringify(band));");
        System.out.println(engine.get("my"));
    }
}
