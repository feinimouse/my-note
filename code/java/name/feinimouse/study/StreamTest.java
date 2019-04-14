package name.feinimouse.study;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.io.Writer;

class StreamTest {
    static Writer createFileWriter(String fileName) throws IOException {
        // return new FileWriter(fileName, true); // true表示往末尾追加而不是覆盖
        return new FileWriter(fileName);
    }
    static BufferedWriter creatBufferWriter(String fileName) throws IOException {
        // 缓冲流能够使输出更快，缓冲流需要通过一个标准流来创建
        return new BufferedWriter(createFileWriter(fileName));
    }
    static Reader createFileReader(String fileName) throws IOException {
        // jdk1.7之后，通过try(){}语句块，能在括号中的语句出错时自动释放资源，并能够抛出真正出错的异常而不是finally中的异常
        try (var fr = new FileReader(fileName)) {
            return fr;
        }
    }
    static BufferedReader creatBufferReader(String fileName) throws IOException {
        // 缓冲流能够使读取更快
        return new BufferedReader(createFileReader(fileName));
    }

    static void testWrite(String fileName, String word) throws IOException {
        BufferedWriter writer = null;
        try {
            writer = creatBufferWriter(fileName);
            writer.write(word);
            writer.newLine();
        } finally {
            // jdk1.7之前，传统的方法在finally中释放资源的方法
            if (writer != null) {
                writer.close();
            }
        }
    }
    static void testAll(String from, String to) throws IOException {
        var reader = creatBufferReader(from);
        String line = reader.readLine();
        while (line != null) {
            testWrite(to, line);
            line = reader.readLine();
        }
        reader.close();
    }

    private static final String PATH = "code/java/name/feinimouse/study";
    public static void testInput() {
        File file = new File(PATH, "helloWorld.js");
        try (
            var in = new FileInputStream(file);
            var bi = new BufferedInputStream(in);
        ) {
            // 一次读取10字节的大小
            byte[] temp = new byte[10];
            // 实际读取的字节大小
            int len = 0;
            String result = "";
            // read(temp)方法将读到的数据保存在temp中，返回实际读到的字节数，且当读不到数据时返回-1
            while ((len = bi.read(temp)) != -1) {
                System.out.println("读到：" + len + "字节");
                result += new String(temp, 0, len);
            }
            System.out.println(result);
        } catch (IOException e) {
            System.out.println("读取失败");
            e.printStackTrace();
        }
    }

    public static void testOutput() {
        File file = new File(PATH, "myWorld.js");
        try (
            // false表示覆盖原文件，否则追加
            var out = new FileOutputStream(file, false);
            var bo = new BufferedOutputStream(out);
        ){
            var str = "console.log('my world');";
            // 转换为字节数组
            byte[] data = str.getBytes();
            // 将字节写入流
            bo.write(data);
            // 将流中的所有字节强制刷新出去，即写入文件，当运行bo.close()时也会自动刷新出去
            // 此时使用try()语句块，可以使close自动运行
            // bo.flush();
        } catch (IOException e) {
            System.out.println("写入失败");
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        testInput();
    }
}
