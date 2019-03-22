import java.io.BufferedReader;
import java.io.BufferedWriter;
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
        try (FileReader fr = new FileReader(fileName)) {
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
        BufferedReader reader = creatBufferReader(from);
        String line = reader.readLine();
        while (line != null) {
            testWrite(to, line);
            line = reader.readLine();
        }
        reader.close();
    }
    
}