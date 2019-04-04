package name.feinimouse.study;

import java.lang.reflect.Array;
/*
* lambda表达式的使用
* 只能用于接口函数，即只有一个抽象函数的接口
*/
public class LambdaUtils {
    public interface SimpleVoidFunc <I> {
        public void run(I item);
    }
    public interface SimpleReturnFunc <I, O> {
        public O run(I item);
    }
    public interface ReturnFunc <I, O> {
        public O run(I item, int index);
    }
    public interface VoidFunc <I> {
        public void run(I item, int index);
    }
    public static <I, O> O[] map(I[] list, Class<O> res,ReturnFunc<I,O> f) {
        // 注意：不能直接创建泛型数组 T[] = new T[size] 会报错
        // 编译器在编译时会将泛型擦除为Object，因此我们需要使用Array反射创建泛型数组
        @SuppressWarnings("unchecked")
        O[] result = (O[])Array.newInstance(res, list.length);
        for (int i = 0; i < list.length; i ++) {
            result[i] = f.run(list[i], i);
        }
        return result;
    }
    public static <I> void forEach(I[] list, SimpleVoidFunc<I> f) {
        for (int i = 0; i < list.length; i ++) {
            f.run(list[i]);
        }
    }
    public static <I> void forEach(I[] list, VoidFunc<I> f) {
        for (int i = 0; i < list.length; i ++) {
            f.run(list[i], i);
        }
    }
    public static <I> void forEachBreak(I[] list, SimpleReturnFunc<I, Boolean> f) {
        for (int i = 0; i < list.length; i ++) {
            Boolean result = (Boolean)f.run(list[i]);
            if (result != null && !result) {
                break;
            }
        }
    }
    public static <I> void forEachBreak(I[] list, ReturnFunc<I, Boolean> f) {
        for (int i = 0; i < list.length; i ++) {
            Boolean result = (Boolean)f.run(list[i], i);
            if (result != null && !result) {
                break;
            }
        }
    }
    public static void testLambda() {
        Integer[] is = new Integer[] {1, 2, 3, 4, 5, 6};
        Integer[] res = map(is, Integer.class, (item, i) -> item + 1);
        forEach(is, item -> System.out.print(item));
        System.out.println();
        forEach(res, item -> System.out.print(item));
    }
    public static <T> String join(T[] list,String j) {
        String result = "";
        for (int i = 0 ; i < list.length; i++) {
            if (i != list.length - 1) {
                result += (list[i].toString() + j);
            } else {
                result += list[i];
            }
        }
        return result;
    }
}
