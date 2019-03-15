import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
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
    static Reader createFileReader(String fileName) throws FileNotFoundException {
        return new FileReader(fileName);
    }
    static BufferedReader creatBufferReader(String fileName) throws FileNotFoundException {
        // 缓冲流能够使读取更快
        return new BufferedReader(createFileReader(fileName));
    }

    static void testWrite(String fileName, String word) throws IOException {
        BufferedWriter writer = creatBufferWriter(fileName);
        writer.write(word);
        writer.newLine();
        writer.close();
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