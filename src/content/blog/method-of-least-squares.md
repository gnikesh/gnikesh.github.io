---
title: 'Method of least squares'
description: 'When there are more equations than unknowns, there is usually no exact solution. The method of least squares - introduced by Adrien-Marie Legendre in 1805 while studying the orbits of comets - tells us how to find the best solution by minimizing the total squared error.'
pubDate: 2025-04-25
tags: ['Computer', 'Machine Learning']
---

We all learned how to solve two linear equations for two unknowns. For example, we learned to solve 2x - y = 3 and 3x + y = 7 for x and y, giving us x = 2 and y = 1. If we have three unknowns, we would need three equations to solve for them. However, what if you have more equations than unknowns? For example, you have 2x - y = 3, 3x + y = 7 and x + y = 4 and you need to solve for x and y? We are in trouble now since the first two equations give us x = 2 and y = 1. However, these values would not satisfy the third equation x + y = 4. Try solving the other two equations, 3x + y = 7 and x + y = 4, and the values you get would not satisfy the first equation.

There is usually no exact solution if we have more equations than unknowns - the unknowns are "overdetermined." So, how would you go about solving the unknowns? The answer was not apparent to mathematicians and scientists before the 1800s. In 1805, Adrien-Marie Legendre published a short book "*Nouvelles méthodes pour la détermination des orbites de comètes*" (New Methods for Determining Orbits of Comets), describing the technique (in French) method of least squares. This was a game-changer and involved minimizing error when we estimated the values of unknowns. We would choose the unknowns that satisfy those equations with *the least overall error*.

Let's go a little back and see what error analysis means. Error analysis focuses on a single formula, say 3x + y = 7, in our case. If we plug in estimated values of x and y, say x = 2 and y = 1, then the left-hand side becomes 3(2) + 1 = 7, which exactly equals the right-hand side. The **error** for this equation is zero. But if we try x = 1.5 and y = 2, then the left-hand side becomes 3(1.5) + 2 = 6.5 + 2 = 8.5, which is off by 1.5. So, the **error** is 1.5 for that equation with those values.

Now imagine we have multiple equations, like:

- 2x - y = 3
- 3x + y = 7
- x + y = 4

If we pick some values of x and y, each equation might have a small error - meaning it doesn't hold exactly. The **method of least squares** tells us to choose the values of x and y that minimize the *total squared error* across all the equations.

Why square the errors? First, squaring gets rid of negative signs - so an error of -2 and an error of 2 both contribute positively. Second, squaring penalizes large errors more than small ones, so the method tends to find a "best fit" that avoids big mistakes.

Mathematically, we define the total squared error E as:

E = (2x - y - 3)² + (3x + y - 7)² + (x + y - 4)²

The goal is to find the values of x and y that **minimize** this error function. This turns into a standard optimization problem, which can be solved using calculus or linear algebra techniques.

So even though there's no *exact* solution when we have more equations than unknowns, we can still find a *best* solution - one that gets as close as possible to satisfying all the equations at once. That's the essence of **least squares**.

Today, this approach is the foundation of everything from linear regression in statistics to solving massive systems of equations in engineering, physics, and machine learning. It helps us deal with noise, inconsistencies, and imperfections in data - which, let's face it, is the norm rather than the exception in the real world.

What started as a way to understand the motion of comets is now powering weather forecasts, self-driving cars, and even your favorite recommendation engine on Netflix. All thanks to Legendre's elegant idea of embracing imperfection and minimizing error.

**Reference:**

1. Stewart, I. (2019). *Do dice play god: The mathematics of uncertainty*
