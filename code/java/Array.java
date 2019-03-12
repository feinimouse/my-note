public class Array {

    public static void main(String[] args) {
        System.out.println(Array.isArrayCite());
    }
    public static boolean isArrayCite() {
        int i1 = 1;
        int i2 = 2;
        int i3 = 3;
        int[] array = { i1, i2, i3 };
        for (int i = 0; i < array.length; i++) {
            array[i] += 10;
            System.out.println(array[i]);
        }
        System.out.println(i1);
        System.out.println(i2);
        System.out.println(i3);
        return i1 == array[0];
    }       
}
