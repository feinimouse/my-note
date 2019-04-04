package name.feinimouse.study.annotation;

public enum Instrument {
    GUITAR("guitar"),
    KEYBOARD("keyboard"),
    DRUM("drum"),
    BASS("bass"),
    DJ("dj");
    private String name;
    private Instrument(String name) {
        this.name = name;
    }
    @Override
    public String toString() {
        return name;
    }
}
