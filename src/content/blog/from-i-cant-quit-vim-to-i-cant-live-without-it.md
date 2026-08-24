---
title: "From \"I Can't Quit Vim\" to \"I Can't Live Without It\""
description: 'How I went from fearing Vim to making it my daily driver for a full year, plus a practical guide to the modes, the key commands, customization, and the gotchas that trip up every newcomer.'
pubDate: 2019-08-11
tags: ['Computer', 'Programming']
---

## 1. How it all started

Vim was the **first text editor I ever heard of** when I began dabbling in Linux, shell scripting, and the mysterious world of the command line. Like many newcomers, I quickly discovered that the *idea* of Vim felt empowering - yet the **reality was intimidating**. My editor of choice back then was Sublime Text; it was friendly, had fancy tabs, and - crucially - didn't lock me in when I fat-fingered `:q!`.

Everything changed the day I had to SSH into a production server that *only* had the basics: `bash`, `nano`, and **Vim**. Nano was adequate for quick config tweaks, but the more Python I wrote the more I craved

- multiple cursors
- regex-powered substitutions
- lightning-fast opens over flaky VPNs

There really is no safer bet than Vim on a UNIX-like box - **I have yet to meet a distribution without it pre-installed** - so I decided to lean in, ditch the training wheels, and make Vim my daily driver for **one full year**. Here's what happened, what I learned, and how you can avoid a few face-plants along the way.

> **Spoiler:** Once you "get" Vim, the muscle memory becomes second nature; it feels less like using a tool and more like *thinking directly into text*.

---

## 2. Understanding Vim's split personality: the modes

If Vim were a game, each *mode* would be a different character class. Mastering when to switch classes is **80% of the battle**.

| Mode (Key Role) | Primary Purpose | Enter With | Exit With |
|---|---|---|---|
| **Normal** (navigation) | Move, delete, copy, paste, issue commands | `Esc` | - |
| **Insert** | Type text | `i`, `a`, `o`, etc. | `Esc` |
| **Visual** | Select text blocks | `v` / `V` / `Ctrl-v` | `Esc` |
| **Command-line (Ex)** | Run Ex commands (`:w`, `:%s/.../`, `:!...`) | `:` / `/` / `?` | `Esc` |
| **Replace / Select / Term** | Niche helpers: `R`, `gh`, `:term` | Varies | `Esc`, `Ctrl-w` |

### Why so many modes?

Because *context-switching with the keyboard is faster* than reaching for modifier keys or menus. Bram Moolenaar built on Bill Joy's original **vi** philosophy: **make the common case a single keystroke**.

---

## 3. Normal Mode: the Jedi temple

Think of Normal Mode as "read-only plus superpowers." You aren't typing text; you're *commanding* it.

### Navigation basics

- `h j k l` - move left, down, up, right (muscle-memory gold)
- `w` / `b` - jump one word forward/back
- `gg` / `G` - go to top/bottom of file

### Editing verbs

| Verb | Action (default) | Example & Explanation |
|---|---|---|
| `d` | delete / cut | `dw` = *delete word* |
| `y` | yank / copy | `yap` = *yank around paragraph* |
| `c` | change (delete -> insert) | `ci"` = *change inside quotes* |
| `>` / `<` | indent / outdent | `>>` = indent current line |

Once this clicks, Vim starts to feel like text Tetris - pieces snap into place with minimal effort.

---

## 4. Insert Mode tips nobody told me

- **Undo granularity** - Vim groups edits between exits from Insert Mode into a single undo step. Pop in and out often (`Esc`, `i`) for *micro-undo* superpowers.
- **Completion** - Press `Ctrl-n` / `Ctrl-p` for context-aware suggestions - even without plugins.
- **Repeating inserts** - `Ctrl-a` or `Ctrl-x` on a number increments or decrements it - handy for numbered lists.

---

## 5. Visual Mode: the Swiss-army pointer

Visual Mode turns Vim into a precise selection tool - minus the mouse lag.

- **Line juggling** - Select lines with `V`, then `:m '+1` or `:m '-2` to move the block (quotes reference selection bounds).
- **Column editing** - Use `Ctrl-v` for block selections; great for CSVs or aligning code. Follow with `J` (join), `I` (insert on every line), or `r` (replace).

---

## 6. Command-line Mode: Ex power unleashed

The humble `:` prompt is where Vim graduates from editor to **text surgeon**.

```vim
:%s/old/new/gc      " global substitution with confirmation
:g/^#/d             " delete every line that starts with #
:e!                 " reload file, discarding changes
:w !sudo tee %      " save a file needing root AFTER opening normally
```

---

## 7. Making Vim feel like "home": customization & plugins

### 7.1 Minimal `~/.vimrc` starter

```vim
" --- Core settings -------------------------------------------------
set nocompatible            " Use Vim defaults, not ancient vi
set number                  " Show absolute line numbers
set relativenumber          " ...plus relative numbers for jumps
set hidden                  " Allow unsaved buffers in background
set tabstop=4 shiftwidth=4  " Four-space tabs
set expandtab               " Convert tabs to spaces
syntax on                   " Syntax highlighting
filetype plugin indent on   " Per-filetype goodies
```

### 7.2 Plugin managers

| Manager | Why I like it |
|---|---|
| **vim-plug** | Dead-simple `Plug 'author/repo'`; asynchronous installs |
| **packer.nvim** | Lua-first; perfect for Neovim users |
| **Pathogen** | Old reliable - drop plugins into `~/.vim/bundle` |

Example **vim-plug** block:

```vim
call plug#begin('~/.vim/plugged')
Plug 'junegunn/fzf',          { 'do': { -> fzf#install() } }
Plug 'tpope/vim-fugitive'      " Best Git wrapper
Plug 'preservim/nerdtree'      " File explorer
Plug 'neoclide/coc.nvim', { 'branch': 'release' }  " LSP & IntelliSense
Plug 'junegunn/goyo.vim'       " Distraction-free writing
call plug#end()
```

Run `:PlugInstall`, grab coffee, and voilà - your 1991 editor now sports a 2025 tux.

---

## 8. Neovim or classic Vim?

- **Neovim** (v0.10+ as of 2025) adds built-in LSP, Lua scripting, and async jobs - handy for modern language tooling.
- **Classic Vim** (9.x) is rock-solid and everywhere, even in minimal Docker images.

I keep **Neovim locally** for rich features and **stock Vim remotely** on servers. Config reuse is painless: Neovim reads `~/.vimrc` and `~/.vim` by default.

---

## 9. Learning resources that actually stuck

| Resource | Why it works |
|---|---|
| `vimtutor` (built-in) | 30-minute hands-on tour - repeat weekly for a month |
| **Vim Adventures** (web game) | Gamified *hjkl* practice |
| `:help` | *The* definitive reference (`:help topic`) |
| Drew Neil's *Practical Vim* | Bite-sized tips that level you up linearly |
| YouTube: *ThePrimeagen*, *TJ DeVries* | Real-world configs, humorous rants |

---

## 10. Beyond basics: five skills that turned me pro

1. **Text objects** - `ci"` (*change inside quotes*), `dap` (*delete around paragraph*).
2. **Macros** - Record `q<letter>`, stop `q`, replay `@<letter>`.
3. **Registers** - Yank into `"ay`, paste with `"ap`; 26 named + clipboard.
4. **Sessions & workspaces** - `:mks!` saves, `:so` restores every buffer.
5. **Terminal integration** - In Neovim, `:term` inside splits feels IDE-grade.

---

## 11. Common "gotchas" (and quick fixes)

| Issue | Fix |
|---|---|
| "I can't quit!" | `:q` (quit) - `:q!` (force) - `:wq` (write + quit) |
| Esc key awkward on MacBooks | `:imap jk <Esc>` for a comfy two-letter escape |
| Arrow keys misbehave over SSH | Add `set ttimeoutlen=10` in `.vimrc` |
| Slow start-up | Profile: `vim --startuptime vim.log`, lazy-load plugins |

---

## 12. Final thoughts: why stick with Vim in 2025?

- **Omnipresent** - From Alpine containers to Raspberry Pi, Vim *is already there*.
- **Keyboard-centric** - Your wrists (and trackpad) will thank you.
- **Hackable** - One-liners, Lua scripts, or full-blown plugins - choose your poison.
- **Community-powered** - 30+ years of wisdom means every obscure query is a search away.
- **Timeless** - Editors come and go, but modal editing still feels futuristic.

So that's the longer, messier, and infinitely more rewarding path I took - from fearing `Esc` to embracing its power. **Give yourself two weeks of *real* usage**, resist the pull of your old editor, and those cryptic commands will morph into muscle memory. When that happens, you'll understand why we Vim-folk won't shut up about a program that still runs in a terminal window.

*Happy hacking - may your `:q!` always be intentional!*

---

> **Vim stands for "Vi IMproved" - and if you stick with it, it'll improve *you* as well.** \:D
