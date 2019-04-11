package name.feinimouse.study;

import java.util.Scanner;

public class ReadType {
    public static String readLine() {
        // 自动关闭scanner输入流
        try (Scanner scanner = new Scanner(System.in)) {
            return scanner.nextLine();
        }
    }
}
