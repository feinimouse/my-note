package name.feinimouse.study.annotation;


@Overview(type = {"electronic", "jazz"}, name = "Hello Happy World")
public class Band {
    public String leader;

    @Player(Instrument.DJ)
    public String songWriter;

    @Player(Instrument.DRUM)
    public String composer;

    public Band() {
        leader = "kokoro";
        songWriter = "misaki";
        composer = "kanon";
    }
}
