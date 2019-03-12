package impl

import (
	"time"
	"net/http"
	"net/http/httputil"
	"fmt"
)

type RetrieverDemo struct {
	Content string
}

// String()接口相当于java的toString()
func (r *RetrieverDemo) String() string {
	return fmt.Sprintf("This is Stringer : {%s}",r.Content)
}

func (r *RetrieverDemo) Post(url string, form map[string]string) string {
	r.Content = form["do"]
	return url + "?content=" + r.Content
}

func (r RetrieverDemo) Get(url string) string {
	return r.Content
}

type Retriever struct {
	UserAgent string
	TimeOut   time.Duration
}

func (r *Retriever) Get(url string) string {
	resp, err := http.Get(url)
	if err != nil {
		panic(err)
	}

	bytes, err := httputil.DumpResponse(resp, true)
	resp.Body.Close()
	if err != nil {
		panic(err)
	}

	return string(bytes)
}
