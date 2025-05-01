"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  Image,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Quote,
  Undo,
  Redo,
} from "lucide-react"

interface RichTextEditorProps {
  initialContent?: string
  onChange: (content: string) => void
}

export function RichTextEditor({ initialContent = "", onChange }: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<"visual" | "html">("visual")
  const [htmlContent, setHtmlContent] = useState(initialContent)
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent
    }
  }, [initialContent])

  const handleContentChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML
      setHtmlContent(content)
      onChange(content)
    }
  }

  const execCommand = (command: string, value = "") => {
    document.execCommand(command, false, value)
    handleContentChange()
    editorRef.current?.focus()
  }

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value
    setHtmlContent(content)
    onChange(content)

    if (editorRef.current && activeTab === "visual") {
      editorRef.current.innerText = content
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value as "visual" | "html")

    if (value === "visual" && editorRef.current) {
      editorRef.current.innerText = htmlContent
    }
  }

  const handleInsertLink = () => {
    const url = prompt("Enter URL:", "https://")
    if (url) {
      execCommand("createLink", url)
    }
  }

  const handleInsertImage = () => {
    const url = prompt("Enter image URL:", "https://")
    if (url) {
      execCommand("insertImage", url)
    }
  }

  return (
    <div className="border rounded-md">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <div className="flex items-center justify-between border-b px-3">
          <TabsList className="h-10">
            <TabsTrigger value="visual" className="text-xs">
              Visual
            </TabsTrigger>
            <TabsTrigger value="html" className="text-xs">
              HTML
            </TabsTrigger>
          </TabsList>

          {activeTab === "visual" && (
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={() => execCommand("undo")} title="Undo">
                <Undo className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => execCommand("redo")} title="Redo">
                <Redo className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <TabsContent value="visual" className="p-0 m-0">
          <div className="flex flex-wrap items-center gap-0.5 border-b p-1">
            <div className="flex items-center border-r pr-1 mr-1">
              <Button variant="ghost" size="icon" onClick={() => execCommand("formatBlock", "<h1>")} title="Heading 1">
                <Heading1 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => execCommand("formatBlock", "<h2>")} title="Heading 2">
                <Heading2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => execCommand("formatBlock", "<h3>")} title="Heading 3">
                <Heading3 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => execCommand("formatBlock", "<h4>")} title="Heading 4">
                <Heading4 className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center border-r pr-1 mr-1">
              <Button variant="ghost" size="icon" onClick={() => execCommand("bold")} title="Bold">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => execCommand("italic")} title="Italic">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => execCommand("underline")} title="Underline">
                <Underline className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => execCommand("strikeThrough")} title="Strikethrough">
                <Strikethrough className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center border-r pr-1 mr-1">
              <Button variant="ghost" size="icon" onClick={() => execCommand("justifyLeft")} title="Align Left">
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => execCommand("justifyCenter")} title="Align Center">
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => execCommand("justifyRight")} title="Align Right">
                <AlignRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center border-r pr-1 mr-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => execCommand("insertUnorderedList")}
                title="Bullet List"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => execCommand("insertOrderedList")}
                title="Numbered List"
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => execCommand("formatBlock", "<blockquote>")}
                title="Quote"
              >
                <Quote className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={handleInsertLink} title="Insert Link">
                <Link className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleInsertImage} title="Insert Image">
                <Image className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => execCommand("formatBlock", "<pre>")}
                title="Code Block"
              >
                <Code className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div
            ref={editorRef}
            className="min-h-[300px] p-4 focus:outline-none prose dark:prose-invert max-w-none prose-img:my-0"
            contentEditable
            onInput={handleContentChange}
            onBlur={handleContentChange}
          />
        </TabsContent>

        <TabsContent value="html" className="p-0 m-0">
          <textarea
            className="w-full min-h-[350px] p-4 font-mono text-sm focus:outline-none bg-muted/50 dark:bg-muted/20"
            value={htmlContent}
            onChange={handleHtmlChange}
            placeholder="Enter HTML content here..."
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

