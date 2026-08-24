---
title: 'From Tweets to Takes: Training an AI to Read the Gun-Control Debate'
description: 'We created GUNSTANCE, the first publicly available machine-learning dataset focused purely on the "banning guns" and "regulating guns" sides of the debate, plus a hybrid self-training + LLM method that reads brand-new conversations as they unfold.'
pubDate: 2025-05-19
tags: ['Computer', 'Machine Learning']
---

Every time a mass-shooting tragedy dominates the U.S. news cycle, social media lights up with urgent, emotional arguments about firearms. Some people call for outright bans on civilian gun ownership, others argue for tighter regulations, and many seek a middle ground. To understand these conversations at scale, our new study created **GUNSTANCE** - the first publicly available machine-learning dataset focused squarely on the two most hot-button positions in the debate: "banning guns" and "regulating guns."

## From millions of tweets to a clean, labeled corpus

We began by collecting tweets posted in the eight weeks following seven high-profile shootings that occurred in 2021-2022. After filtering out retweets, links to external news sites, and corporate news accounts, we were left with about 86,000 reactions written by users.

Two targets were defined:

- **"Guns should be banned."**
- **"Guns should be regulated."**

Because a single tweet can take a stance on one or both targets, each tweet was compared to both statements. Using Amazon Mechanical Turk, annotators assigned 2,700 tweets about banning guns and 2,800 about regulating guns to one of three easy-to-grasp classes - **In-Favor, Against, or Neutral**. The remaining 16,000+ unlabeled tweets were deliberately kept in the dataset so that modern semi-supervised techniques could learn from them.

## Why ordinary classifiers were not enough

Traditional stance-detection systems need thousands of hand-labeled examples. Even then they struggle when a fresh shooting suddenly shifts the tone and vocabulary of the debate. Large language models (LLMs) such as ChatGPT show impressive zero-shot skills, but calling them for every new tweet is expensive and slow.

To get the best of both worlds, we introduced a **hybrid method called AUM-ST + ChatGPT**. It starts with AUM-ST, a self-training algorithm that watches how confidently a base neural network (BERTweet, in this case) predicts pseudo-labels for the unlabeled tweets. Whenever AUM-ST finds tweets whose labels it is *least* sure about, it sends only this small, hard subset - roughly five percent of the data - to ChatGPT for a second opinion. Those ChatGPT labels are then folded back into training, and the cycle repeats. Because the LLM is consulted sparingly, the approach adds little cost while injecting expert-level knowledge just where it matters most.

## How well does it work?

Across multiple test settings, the hybrid system consistently outperformed every baseline:

- On all events combined, its F1-score reached **66.5%** for "banning guns" and **66.1%** for "regulating guns", beating the best purely supervised model by about eight percentage points and even edging out ChatGPT used by itself.
- When the model was trained on six shootings and evaluated on a **new, unseen** event such as Buffalo or Uvalde, the hybrid still led the pack, gaining up to ten F1 points over the next-best method.
- In the toughest cross-target test - training on "ban" but predicting "regulate", and vice-versa - it either matched or surpassed specialised semi-supervised alternatives.

In plain language, the system can follow a brand-new gun-control conversation as it unfolds and reliably tell whether a tweet is supporting, opposing, or sitting on the fence.

## What this means beyond gun control

Because *GUNSTANCE* is public and ships with strong baselines, it gives the community a realistic testbed for measuring progress in stance detection under real-time, emotionally charged conditions. The hybrid SSL-with-LLM recipe is equally valuable: any domain where labeled data are scarce but unlabeled text pours in - think public-health rumors, climate-policy debates, or product-review sentiment - can reuse the same strategy.

The code and dataset are freely available on [GitHub](https://github.com/gnikesh/gunstance), so you can explore the tweets, retrain the models, or adapt the pipeline to your own topic.

**Reference:**

Gyawali, Nikesh, Iustin Sirbu, Tiberiu Sosea, Sarthak Khanal, Doina Caragea, Traian Rebedea, and Cornelia Caragea. 2024. "GunStance: Stance Detection for Gun Control and Gun Regulation." *Proceedings of the 62nd Annual Meeting of the Association for Computational Linguistics (ACL 2024), Volume 1: Long Papers*, pp. 12027-12044. Association for Computational Linguistics.

ACL Anthology link (open access): [https://aclanthology.org/2024.acl-long.650](https://aclanthology.org/2024.acl-long.650)

> **Original manuscript summarized by ChatGPT**
