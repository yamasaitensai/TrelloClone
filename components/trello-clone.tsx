'use client'

import { useState, useRef, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { Bell, ChevronDown, Filter, Zap, MoreHorizontal, Plus, Search, Star, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Card {
  id: string
  content: string
}

interface List {
  id: string
  title: string
  cards: Card[]
}

export function TrelloCloneComponent() {
  const [lists, setLists] = useState<List[]>([
    { id: "list-1", title: "To Do", cards: [{ id: "card-1", content: "プロジェクト計画" }, { id: "card-2", content: "キックオフミーティング" }] },
    { id: "list-2", title: "作業中", cards: [] },
    { id: "list-3", title: "完了", cards: [] },
  ])
  const [editingCard, setEditingCard] = useState<{ listId: string, cardId: string } | null>(null)
  const editInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editingCard && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [editingCard])

  const addCard = (listId: string) => {
    setLists(currentLists =>
      currentLists.map(list =>
        list.id === listId
          ? { ...list, cards: [...list.cards, { id: `card-${Date.now()}`, content: "新しいカード" }] }
          : list
      )
    )
  }

  const addList = () => {
    const newList: List = {
      id: `list-${Date.now()}`,
      title: "新しいリスト",
      cards: []
    }
    setLists(currentLists => [...currentLists, newList])
  }

  const editCard = (listId: string, cardId: string, newContent: string) => {
    setLists(currentLists =>
      currentLists.map(list =>
        list.id === listId
          ? {
              ...list,
              cards: list.cards.map(card =>
                card.id === cardId ? { ...card, content: newContent } : card
              )
            }
          : list
      )
    )
    setEditingCard(null)
  }

  const deleteCard = (listId: string, cardId: string) => {
    setLists(currentLists =>
      currentLists.map(list =>
        list.id === listId
          ? { ...list, cards: list.cards.filter(card => card.id !== cardId) }
          : list
      )
    )
  }

  const deleteList = (listId: string) => {
    setLists(currentLists => currentLists.filter(list => list.id !== listId))
  }

  const onDragEnd = (result: DropResult) => {
    // ドラッグ＆ドロップの処理をここに実装
  }

  return (
    <div className="flex flex-col h-screen bg-[#b04d7e]">
      {/* ヘッダー */}
      <header className="flex items-center justify-between px-4 py-2 bg-[#a3456f] text-white">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5zM4 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4z" />
            </svg>
          </Button>
          <span className="font-bold text-lg">Trello</span>
          <Button variant="ghost" className="text-white">
            ワークスペース
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="ghost" className="text-white">
            最近
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="ghost" className="text-white">
            スター付き
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="ghost" className="text-white">
            テンプレート
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="secondary" className="bg-[#b86f91] hover:bg-[#c27a9c] text-white">
            作成
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="検索" className="pl-8 bg-[#b86f91] text-white placeholder-gray-300" />
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </Button>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 overflow-x-auto">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">test</h1>
            <Button variant="ghost" size="icon" className="text-white">
              <Star className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" className="text-white">
              <Zap className="mr-2 h-4 w-4" />
              パワーアップ
            </Button>
            <Button variant="ghost" className="text-white">
              <Filter className="mr-2 h-4 w-4" />
              フィルター
            </Button>
            <div className="bg-[#b86f91] rounded-full w-8 h-8 flex items-center justify-center text-white">
              <User className="h-5 w-5" />
            </div>
            <Button variant="ghost" className="text-white">
              共有する
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-lists" direction="horizontal" type="LIST">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex space-x-4 p-6"
              >
                {lists.map((list, index) => (
                  <Draggable key={list.id} draggableId={list.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-[#ebecf0] rounded-lg p-3 w-72"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold">{list.title}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => deleteList(list.id)}
                            aria-label={`${list.title}リストを削除`}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <Droppable droppableId={list.id} type="CARD">
                          {(provided) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className="min-h-[2rem]"
                            >
                              {list.cards.map((card, index) => (
                                <Draggable key={card.id} draggableId={card.id} index={index}>
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="bg-white rounded shadow p-2 mb-2 group"
                                    >
                                      {editingCard?.listId === list.id && editingCard?.cardId === card.id ? (
                                        <Input
                                          ref={editInputRef}
                                          defaultValue={card.content}
                                          onBlur={(e) => editCard(list.id, card.id, e.target.value)}
                                          onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                              editCard(list.id, card.id, e.currentTarget.value)
                                            }
                                          }}
                                        />
                                      ) : (
                                        <div className="flex justify-between items-center">
                                          <span onClick={() => setEditingCard({ listId: list.id, cardId: card.id })}>
                                            {card.content}
                                          </span>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => deleteCard(list.id, card.id)}
                                            aria-label={`${card.content}カードを削除`}
                                          >
                                            <X className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-gray-600 mt-2"
                          onClick={() => addCard(list.id)}
                          aria-label={`${list.title}リストにカードを追加`}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          カードを追加
                        </Button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Button
          variant="ghost"
          className="h-10 px-4 py-2 bg-[#ffffff3d] text-white ml-6"
          onClick={addList}
          aria-label="新しいリストを追加"
        >
          <Plus className="mr-2 h-4 w-4" />
          もう1つリストを追加
        </Button>
      </main>
    </div>
  )
}